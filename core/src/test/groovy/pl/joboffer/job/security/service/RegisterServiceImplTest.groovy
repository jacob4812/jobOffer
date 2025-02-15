package pl.joboffer.job.security.service

import org.springframework.security.crypto.password.PasswordEncoder
import pl.joboffer.job.dto.company.CompanyRegisterDetails
import pl.joboffer.job.dto.user.UserRegisterDetails
import pl.joboffer.job.enums.UserRole
import pl.joboffer.job.features.company.CompanyEntity
import pl.joboffer.job.features.company.CompanyMapper
import pl.joboffer.job.features.company.CompanyMapperImpl
import pl.joboffer.job.features.company.CompanyRepository
import pl.joboffer.job.features.company.ValidationServiceImpl
import pl.joboffer.job.features.user.UserEntity
import pl.joboffer.job.features.user.UserMapper
import pl.joboffer.job.features.user.UserMapperImpl
import pl.joboffer.job.features.user.UserRepository
import spock.lang.Specification
import spock.lang.Subject
import spock.lang.Unroll

class RegisterServiceImplTest extends Specification {
    def userMapper = Mock(UserMapper)
    def companyMapper = Mock(CompanyMapper)
    def passwordEncoder = Mock(PasswordEncoder)
    def userRepository = Mock(UserRepository)
    def companyRepository = Mock(CompanyRepository)
    def validationService = Mock(ValidationServiceImpl)

    @Subject
    RegisterServiceImpl registerService = new RegisterServiceImpl(
            userMapper, companyMapper, passwordEncoder, userRepository, companyRepository, validationService)

    @Unroll
    def "should return #expectedMessage when user email is #emailUsed"() {
        given:
        def userRegisterDetails = new UserRegisterDetails(1L, "username", "user@example.com", "Password1!")
        validationService.isEmailAlreadyInUse(userRegisterDetails.email()) >> emailUsed
        if (!emailUsed) {
            def userEntity = Mock(UserEntity)
            userMapper.mapDtoToEntity(userRegisterDetails) >> userEntity
            passwordEncoder.encode(userRegisterDetails.password()) >> "encodedPassword"
            userEntity.setPassword("encodedPassword")
            userEntity.setUserRole(UserRole.EMPLOYEE)
        }

        when:
        def result = registerService.signup(userRegisterDetails)

        then:
        result.emailUsed == emailUsed
        result.message == expectedMessage

        where:
        emailUsed | expectedMessage
        true      | "E-mail jest już używany przez innego użytkownika lub firmę."
        false     | "Rejestracja zakończona sukcesem"
    }

    @Unroll
    def "should return #expectedMessage when company email is #emailUsed"() {
        given:
        def companyRegisterDetails = new CompanyRegisterDetails(1L,"CompanyName","company@example.com", "Password1!",1234567890,123456789)
        validationService.isEmailAlreadyInUse(companyRegisterDetails.email()) >> emailUsed
        if (!emailUsed) {
            def companyEntity = Mock(CompanyEntity)
            companyMapper.mapDtoToEntity(companyRegisterDetails) >> companyEntity
            passwordEncoder.encode(companyRegisterDetails.password()) >> "encodedPassword"
            companyEntity.setPassword("encodedPassword")
            companyEntity.setUserRole(UserRole.COMPANY)
        }

        when:
        def result = registerService.companySignup(companyRegisterDetails)

        then:
        result.emailUsed == emailUsed
        result.message == expectedMessage

        where:
        emailUsed | expectedMessage
        true      | "E-mail jest już używany przez innego użytkownika lub firmę."
        false     | "Rejestracja zakończona sukcesem"
    }
}
