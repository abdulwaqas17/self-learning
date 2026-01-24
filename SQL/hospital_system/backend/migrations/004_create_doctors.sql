CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  department_id INT,
  hospital_id INT,
  specialization VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
);