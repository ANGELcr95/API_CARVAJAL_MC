CREATE TABLE IF NOT EXISTS type_contacts(
    id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(200)
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
