--INSERT INTO userTable (email, login, password, user_role)
--VALUES
--    ('admin@example.com', 'administ', 'admin123', 'ADMIN'),
--    ('user1@example.com', 'user1', 'password1', 'EMPLOYEE'),
--    ('user2@example.com', 'user2', 'password2', 'EMPLOYEE'),
--    ('hr1@example.com', 'hr1', 'password3', 'HR');
INSERT INTO offer (company_id, title, location, contract_type, salary, expiration_date, description)
VALUES
    (1, 'Software Engineer', 'Warszawa', 'Kontrakt B2B', 50000.00, '2024-05-01', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    (2, 'IT Specialist', 'Gniezno', 'Kontrakt B2B', 50000.00, '2024-04-30', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    (3, 'Java Developer', 'Lublin', 'Umowa o pracę', 60000.00, '2024-04-30', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    (4, 'IT Specialist', 'Gniezno', 'Kontrakt B2B', 50000.00, '2024-04-30', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'),
    (5, 'Frontend Developer', 'Kraków', 'Kontrakt B2B', 55000.00, '2024-06-15', 'Looking for a skilled frontend developer with React experience.'),
    (6, 'Backend Developer', 'Wrocław', 'Umowa o pracę', 65000.00, '2024-07-01', 'Seeking an experienced backend developer for our growing team.'),
    (7, 'Data Scientist', 'Warszawa', 'Kontrakt B2B', 70000.00, '2024-05-20', 'Join us as a data scientist to help analyze big data and drive business insights.'),
    (8, 'UX/UI Designer', 'Gdańsk', 'Umowa o pracę', 60000.00, '2024-05-25', 'We need a creative UX/UI designer to enhance user experience for our products.'),
    (9, 'Product Manager', 'Poznań', 'Kontrakt B2B', 75000.00, '2024-06-01', 'Experienced product manager needed to lead product development and strategy.'),
    (10, 'System Administrator', 'Szczecin', 'Umowa o pracę', 50000.00, '2024-05-15', 'Responsible for maintaining and managing our IT infrastructure.'),
    (11, 'Business Analyst', 'Katowice', 'Kontrakt B2B', 55000.00, '2024-07-10', 'Looking for a business analyst to work on project requirements and process improvements.'),
    (12, 'Network Engineer', 'Bydgoszcz', 'Umowa o pracę', 58000.00, '2024-06-05', 'Join our team as a network engineer to manage and optimize network systems.'),
    (13, 'Software Architect', 'Lublin', 'Kontrakt B2B', 80000.00, '2024-07-20', 'Seeking a software architect to design scalable and efficient software solutions.'),
    (14, 'Digital Marketer', 'Rzeszów', 'Umowa o pracę', 52000.00, '2024-06-30', 'Looking for a digital marketer to drive online marketing campaigns and strategies.');
--    INSERT INTO company (company_name, nip, email, password, phone_number, user_role)
--VALUES
--('Firma #1', 123456789, 'firma1@example.com', 'password1', 123456789, 'admin'),
--('Firma #2', 987654321, 'firma2@example.com', 'password2', 987654321, 'admin');
