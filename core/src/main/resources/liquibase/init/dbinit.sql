CREATE TABLE "user" (
                        id SERIAL PRIMARY KEY,
                        username VARCHAR(50) NOT NULL,
                        email VARCHAR(100) NOT NULL,
                        password VARCHAR(100) NOT NULL,
                        role VARCHAR(20) DEFAULT 'employee' CHECK (role IN ('admin', 'employee', 'hr'))
);
CREATE TABLE application (
                             id SERIAL PRIMARY KEY,
                             user_id INT NOT NULL,
                             joboffer_id INT NOT NULL,
                             application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
                             FOREIGN KEY (user_id) REFERENCES "user"(id),
                             FOREIGN KEY (joboffer_id) REFERENCES joboffer(id)
);
CREATE TABLE hr (
                    id SERIAL PRIMARY KEY,
                    user_id INT NOT NULL,
                    company_name VARCHAR(100) NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES "user"(id)
);
CREATE TABLE joboffer (
                          id SERIAL PRIMARY KEY,
                          hr_id INT NOT NULL,
                          title VARCHAR(100) NOT NULL,
                          description TEXT NOT NULL,
                          location VARCHAR(100),
                          salary DECIMAL(10, 2),
                          expiration_date DATE,
                          status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
                          FOREIGN KEY (hr_id) REFERENCES hr(id)
);
