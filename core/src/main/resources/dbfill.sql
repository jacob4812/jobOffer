CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO user_table (email, login, password,name,surname, user_role)
VALUES
    ('admin@example.com', 'administ', crypt('admin123', gen_salt('bf')),null,null, 'ADMIN'),
    ('user1@example.com', 'user1', crypt('password1', gen_salt('bf')),null,null, 'EMPLOYEE'),
    ('user2@example.com', 'user2', crypt('password2', gen_salt('bf')),null,null, 'EMPLOYEE'),
    ('hr1@example.com', 'hr1', crypt('password3', gen_salt('bf')),null,null, 'HR');
INSERT INTO company (id,company_name, nip, email, password, phone_number, user_role)
VALUES
(1,'Firma #1', 123456789, 'firma1@example.com', crypt('zaq1', gen_salt('bf')), 123456789, 'COMPANY'),
(2,'Firma #2', 987654321, 'firma2@example.com', crypt('zaq1', gen_salt('bf')), 987654321, 'COMPANY'),
(3,'Firma #3', 987654321, 'firma3@example.com', crypt('zaq1', gen_salt('bf')), 987654321, 'COMPANY'),
(4,'Firma #4', 987654321, 'firma4@example.com', crypt('zaq1', gen_salt('bf')), 987654321, 'COMPANY'),
(5,'Firma #5', 987654321, 'firma5@example.com', crypt('zaq1', gen_salt('bf')), 987654321, 'COMPANY');

INSERT INTO offer (company_id, title, location, contract_type, salary, expiration_date, description)
VALUES
    (1, 'Software Engineer', 'Warszawa', 'Kontrakt B2B', 50000.00, '2024-05-01', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    (2, 'IT Specialist', 'Gniezno', 'Kontrakt B2B', 50000.00, '2024-04-30', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    (5, 'Java Developer', 'Lublin', 'Umowa o pracę', 60000.00, '2024-04-30', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    (1, 'IT Specialist', 'Gniezno', 'Kontrakt B2B', 50000.00, '2024-04-30', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    (4, 'Frontend Developer', 'Kraków', 'Kontrakt B2B', 55000.00, '2024-06-15', 'Looking for a skilled frontend developer with React experience.'),
    (1, 'Backend Developer', 'Wrocław', 'Umowa o pracę', 65000.00, '2024-07-01', 'Seeking an experienced backend developer for our growing team.'),
    (2, 'Data Scientist', 'Warszawa', 'Kontrakt B2B', 70000.00, '2024-05-20', 'Join us as a data scientist to help analyze big data and drive business insights.'),
    (1, 'UX/UI Designer', 'Gdańsk', 'Umowa o pracę', 60000.00, '2024-05-25', 'We need a creative UX/UI designer to enhance user experience for our products.'),
    (2, 'Product Manager', 'Poznań', 'Kontrakt B2B', 75000.00, '2024-06-01', 'Experienced product manager needed to lead product development and strategy.'),
    (1, 'System Administrator', 'Szczecin', 'Umowa o pracę', 50000.00, '2024-05-15', 'Responsible for maintaining and managing our IT infrastructure.'),
    (3, 'Business Analyst', 'Katowice', 'Kontrakt B2B', 55000.00, '2024-07-10', 'Looking for a business analyst to work on project requirements and process improvements.'),
    (1, 'Network Engineer', 'Bydgoszcz', 'Umowa o pracę', 58000.00, '2024-06-05', 'Join our team as a network engineer to manage and optimize network systems.'),
    (4, 'Software Architect', 'Lublin', 'Kontrakt B2B', 80000.00, '2024-07-20', 'Seeking a software architect to design scalable and efficient software solutions.'),
    (1, 'Digital Marketer', 'Rzeszów', 'Umowa o pracę', 52000.00, '2024-06-30', 'Looking for a digital marketer to drive online marketing campaigns and strategies.');
