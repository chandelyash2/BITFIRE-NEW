import crypto from 'crypto';
const SECRET:any =process.env.NEXT_PUBLIC_SECRET_KEY 
// Convert any key into a valid 32-byte key using SHA-256
const secretKey = crypto.createHash('sha256').update(SECRET).digest();  // Now it's 32 bytes
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);  // 16-byte initialization vector

// Encrypt function
export const encryptData = (data: string): string => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

// Decrypt function
export const decryptData = (encryptedData: string): string => {
  const [ivString, encryptedString] = encryptedData?.split(':');
  const iv = Buffer.from(ivString, 'hex');
  const encryptedText = Buffer.from(encryptedString, 'hex');
  
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  
  return decrypted.toString();
};
