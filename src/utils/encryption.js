const crypto = require('crypto')
const { Pool } = require('pg')

class EncryptionService {
  constructor() {
    this.algorithm = 'aes-256-gcm'
    this.keyLength = 32
    this.ivLength = 16
    this.tagLength = 16
    
    // Initialize database connection for key management
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
    
    // Master encryption key from environment
    this.masterKey = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')
    
    if (!this.masterKey || this.masterKey.length !== this.keyLength) {
      throw new Error('Invalid ENCRYPTION_KEY. Must be 64 character hex string.')
    }
  }

  // Generate a new encryption key
  generateKey() {
    return crypto.randomBytes(this.keyLength)
  }

  // Generate a new IV
  generateIV() {
    return crypto.randomBytes(this.ivLength)
  }

  // Encrypt data with a specific key
  encrypt(data, key = null) {
    try {
      const encryptionKey = key || this.masterKey
      const iv = this.generateIV()
      const cipher = crypto.createCipher(this.algorithm, encryptionKey)
      
      let encrypted = cipher.update(data, 'utf8', 'hex')
      encrypted += cipher.final('hex')
      
      const tag = cipher.getAuthTag()
      
      return {
        encrypted,
        iv: iv.toString('hex'),
        tag: tag.toString('hex')
      }
    } catch (error) {
      console.error('Encryption error:', error)
      throw new Error('Failed to encrypt data')
    }
  }

  // Decrypt data with a specific key
  decrypt(encryptedData, iv, tag, key = null) {
    try {
      const encryptionKey = key || this.masterKey
      const decipher = crypto.createDecipher(this.algorithm, encryptionKey)
      decipher.setAuthTag(Buffer.from(tag, 'hex'))
      
      let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      
      return decrypted
    } catch (error) {
      console.error('Decryption error:', error)
      throw new Error('Failed to decrypt data')
    }
  }

  // Encrypt field-level data (for database storage)
  encryptField(value) {
    if (!value) return null
    
    const { encrypted, iv, tag } = this.encrypt(value)
    return JSON.stringify({ encrypted, iv, tag })
  }

  // Decrypt field-level data (from database)
  decryptField(encryptedValue) {
    if (!encryptedValue) return null
    
    try {
      const { encrypted, iv, tag } = JSON.parse(encryptedValue)
      return this.decrypt(encrypted, iv, tag)
    } catch (error) {
      console.error('Field decryption error:', error)
      return null
    }
  }

  // Encrypt sensitive workflow data
  encryptWorkflowData(workflowData) {
    const sensitiveFields = ['credentials', 'nodes', 'connections', 'settings']
    const encryptedWorkflow = { ...workflowData }
    
    for (const field of sensitiveFields) {
      if (workflowData[field]) {
        encryptedWorkflow[field] = this.encryptField(
          JSON.stringify(workflowData[field])
        )
      }
    }
    
    return encryptedWorkflow
  }

  // Decrypt workflow data
  decryptWorkflowData(encryptedWorkflow) {
    const sensitiveFields = ['credentials', 'nodes', 'connections', 'settings']
    const decryptedWorkflow = { ...encryptedWorkflow }
    
    for (const field of sensitiveFields) {
      if (encryptedWorkflow[field]) {
        try {
          decryptedWorkflow[field] = JSON.parse(
            this.decryptField(encryptedWorkflow[field])
          )
        } catch (error) {
          console.error(`Failed to decrypt workflow field ${field}:`, error)
          decryptedWorkflow[field] = null
        }
      }
    }
    
    return decryptedWorkflow
  }

  // Encrypt user PII data
  encryptPII(userData) {
    const piiFields = ['email', 'first_name', 'last_name', 'phone', 'address']
    const encryptedUser = { ...userData }
    
    for (const field of piiFields) {
      if (userData[field]) {
        encryptedUser[field] = this.encryptField(userData[field])
      }
    }
    
    return encryptedUser
  }

  // Decrypt user PII data
  decryptPII(encryptedUserData) {
    const piiFields = ['email', 'first_name', 'last_name', 'phone', 'address']
    const decryptedUser = { ...encryptedUserData }
    
    for (const field of piiFields) {
      if (encryptedUserData[field]) {
        try {
          decryptedUser[field] = this.decryptField(encryptedUserData[field])
        } catch (error) {
          console.error(`Failed to decrypt PII field ${field}:`, error)
          decryptedUser[field] = null
        }
      }
    }
    
    return decryptedUser
  }

  // Encrypt API keys and secrets
  encryptSecret(secret) {
    if (!secret) return null
    return this.encryptField(secret)
  }

  // Decrypt API keys and secrets
  decryptSecret(encryptedSecret) {
    if (!encryptedSecret) return null
    return this.decryptField(encryptedSecret)
  }

  // Hash sensitive data (one-way encryption)
  hashData(data, salt = null) {
    const actualSalt = salt || crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(data, actualSalt, 10000, 64, 'sha512')
    return {
      hash: hash.toString('hex'),
      salt: actualSalt
    }
  }

  // Verify hashed data
  verifyHash(data, hash, salt) {
    const newHash = crypto.pbkdf2Sync(data, salt, 10000, 64, 'sha512')
    return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), newHash)
  }

  // Generate secure random string
  generateSecureRandom(length = 32) {
    return crypto.randomBytes(length).toString('hex')
  }

  // Generate secure token
  generateSecureToken() {
    return crypto.randomBytes(32).toString('base64url')
  }

  // Encrypt file content
  async encryptFile(fileBuffer) {
    try {
      const { encrypted, iv, tag } = this.encrypt(fileBuffer.toString('base64'))
      return {
        encrypted: Buffer.from(encrypted, 'hex'),
        iv: Buffer.from(iv, 'hex'),
        tag: Buffer.from(tag, 'hex')
      }
    } catch (error) {
      console.error('File encryption error:', error)
      throw new Error('Failed to encrypt file')
    }
  }

  // Decrypt file content
  async decryptFile(encryptedBuffer, iv, tag) {
    try {
      const decrypted = this.decrypt(
        encryptedBuffer.toString('hex'),
        iv.toString('hex'),
        tag.toString('hex')
      )
      return Buffer.from(decrypted, 'base64')
    } catch (error) {
      console.error('File decryption error:', error)
      throw new Error('Failed to decrypt file')
    }
  }

  // Key rotation - generate new key and re-encrypt data
  async rotateEncryptionKey(organizationId, keyType = 'data') {
    try {
      const newKey = this.generateKey()
      const newKeyId = crypto.randomUUID()
      
      // Store new key in database
      await this.pool.query(`
        INSERT INTO encryption_keys (
          id, key_id, key_type, encrypted_key, key_version, is_active, organization_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [
        newKeyId,
        newKeyId,
        keyType,
        this.encryptField(newKey.toString('hex')),
        1,
        true,
        organizationId
      ])
      
      // Mark old keys as inactive
      await this.pool.query(`
        UPDATE encryption_keys 
        SET is_active = false 
        WHERE organization_id = $1 AND key_type = $2 AND is_active = true
      `, [organizationId, keyType])
      
      return newKeyId
      
    } catch (error) {
      console.error('Key rotation error:', error)
      throw new Error('Failed to rotate encryption key')
    }
  }

  // Get active encryption key for organization
  async getActiveKey(organizationId, keyType = 'data') {
    try {
      const result = await this.pool.query(`
        SELECT encrypted_key FROM encryption_keys
        WHERE organization_id = $1 AND key_type = $2 AND is_active = true
        ORDER BY created_at DESC
        LIMIT 1
      `, [organizationId, keyType])
      
      if (result.rows.length === 0) {
        return this.masterKey
      }
      
      const encryptedKey = result.rows[0].encrypted_key
      const keyHex = this.decryptField(encryptedKey)
      return Buffer.from(keyHex, 'hex')
      
    } catch (error) {
      console.error('Get active key error:', error)
      return this.masterKey
    }
  }

  // Encrypt with organization-specific key
  async encryptWithOrgKey(data, organizationId, keyType = 'data') {
    try {
      const orgKey = await this.getActiveKey(organizationId, keyType)
      return this.encrypt(data, orgKey)
    } catch (error) {
      console.error('Organization key encryption error:', error)
      return this.encrypt(data) // Fallback to master key
    }
  }

  // Decrypt with organization-specific key
  async decryptWithOrgKey(encryptedData, iv, tag, organizationId, keyType = 'data') {
    try {
      const orgKey = await this.getActiveKey(organizationId, keyType)
      return this.decrypt(encryptedData, iv, tag, orgKey)
    } catch (error) {
      console.error('Organization key decryption error:', error)
      return this.decrypt(encryptedData, iv, tag) // Fallback to master key
    }
  }

  // Encrypt sensitive configuration
  encryptConfig(config) {
    const sensitiveConfigKeys = [
      'apiKey', 'secretKey', 'password', 'token', 'credential',
      'privateKey', 'clientSecret', 'webhookSecret'
    ]
    
    const encryptedConfig = { ...config }
    
    for (const [key, value] of Object.entries(config)) {
      if (sensitiveConfigKeys.some(sensitiveKey => 
        key.toLowerCase().includes(sensitiveKey.toLowerCase())
      )) {
        encryptedConfig[key] = this.encryptField(value)
      }
    }
    
    return encryptedConfig
  }

  // Decrypt configuration
  decryptConfig(encryptedConfig) {
    const sensitiveConfigKeys = [
      'apiKey', 'secretKey', 'password', 'token', 'credential',
      'privateKey', 'clientSecret', 'webhookSecret'
    ]
    
    const decryptedConfig = { ...encryptedConfig }
    
    for (const [key, value] of Object.entries(encryptedConfig)) {
      if (sensitiveConfigKeys.some(sensitiveKey => 
        key.toLowerCase().includes(sensitiveKey.toLowerCase())
      )) {
        decryptedConfig[key] = this.decryptField(value)
      }
    }
    
    return decryptedConfig
  }

  // Cleanup expired keys
  async cleanupExpiredKeys() {
    try {
      await this.pool.query(`
        DELETE FROM encryption_keys 
        WHERE expires_at < NOW() AND expires_at IS NOT NULL
      `)
      
      console.log('Cleaned up expired encryption keys')
      
    } catch (error) {
      console.error('Key cleanup error:', error)
    }
  }

  // Get encryption statistics
  async getEncryptionStats(organizationId) {
    try {
      const result = await this.pool.query(`
        SELECT 
          key_type,
          COUNT(*) as key_count,
          COUNT(CASE WHEN is_active = true THEN 1 END) as active_keys,
          MAX(created_at) as latest_key_created
        FROM encryption_keys
        WHERE organization_id = $1
        GROUP BY key_type
      `, [organizationId])
      
      return result.rows
      
    } catch (error) {
      console.error('Encryption stats error:', error)
      return []
    }
  }

  // Validate encryption key strength
  validateKeyStrength(key) {
    if (!key || key.length < 32) {
      return { valid: false, reason: 'Key too short' }
    }
    
    // Check for common weak patterns
    const weakPatterns = [
      /^0+$/, // All zeros
      /^1+$/, // All ones
      /^[0-9]+$/, // All digits
      /^[a-f]+$/i, // All hex letters
    ]
    
    for (const pattern of weakPatterns) {
      if (pattern.test(key)) {
        return { valid: false, reason: 'Key pattern too weak' }
      }
    }
    
    return { valid: true }
  }

  // Generate secure password
  generateSecurePassword(length = 16) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charset.length)
      password += charset[randomIndex]
    }
    
    return password
  }

  // Close database connection
  async close() {
    if (this.pool) {
      await this.pool.end()
    }
  }
}

module.exports = { EncryptionService }
