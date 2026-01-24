CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  hospital_id INT,
  FOREIGN KEY (hospital_id) REFERENCES hospitals(id)
);