
CREATE TABLE user_table (
    id SERIAL PRIMARY KEY,
    login VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number BIGINT,
    user_role VARCHAR(20) DEFAULT 'admin'
);

CREATE TABLE offer (
    id SERIAL PRIMARY KEY,
    company_id BIGINT NOT NULL, -- Foreign key referencing the company table
    title VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    contract_type VARCHAR(50),
    salary NUMERIC(10, 2),
    expiration_date DATE,
    description TEXT NOT NULL,
    CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE
);

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(50) NOT NULL,
    nip BIGINT,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number BIGINT,
    user_role VARCHAR(20) DEFAULT 'admin'
);
