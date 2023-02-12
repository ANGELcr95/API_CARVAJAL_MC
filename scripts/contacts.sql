CREATE TABLE IF NOT EXISTS contacts(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    country VARCHAR(100),
    cell_phone INT,
    address VARCHAR(200),
    type_id VARCHAR(200),
    user_id VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (type_id) REFERENCES users(id),
    FOREIGN KEY (user_id) REFERENCES type_contacts(id)
);
