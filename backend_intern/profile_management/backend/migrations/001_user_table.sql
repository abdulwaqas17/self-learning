CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,

  -- Auth
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),

  -- Profile
  designation VARCHAR(255),
  contact_number VARCHAR(50),
  connect_me_for TEXT,

  -- Media (User)
  profile_pic_key VARCHAR(500),
  profile_pic_url VARCHAR(500),

  -- Media (Company)
  company_logo_key VARCHAR(500),
  company_logo_url VARCHAR(500),

  -- System
  profile_completed BOOLEAN DEFAULT FALSE,
  role ENUM('MEMBER','ADMIN') DEFAULT 'MEMBER',
  token_version INT DEFAULT 1,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);
