package pl.joboffer.job.features.offer


import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import pl.joboffer.job.dto.company.CompanyDetails
import pl.joboffer.job.dto.offer.Offer
import pl.joboffer.job.enums.UserRole
import pl.joboffer.job.features.company.CompanyMapper
import spock.lang.Specification

import java.time.LocalDate

class OfferServiceImplTest extends Specification {

    def offerRepository = Mock(OfferRepository)
    def companyMapper = Mock(CompanyMapper)
    def offerMapper = new OfferMapperImpl(companyMapper)
    def offerService = new OfferServiceImpl(offerMapper, offerRepository, null)

    def "powinno zwrocic wszystkie oferty pracy"() {
        given: "Lista ofert i zapytanie paginowane"
        def pageRequest = PageRequest.of(0, 5)
        def offerEntityList = [new OfferEntity(id: 1L, title: "Java Developer")]
        def company = new CompanyDetails(1L,"company",524524, UserRole.COMPANY,123)
        def offerList = [new Offer(1L,"Java Developer","location","b2b",212.00, LocalDate.of(2025,02,28),"desc",company)]
        def page = new PageImpl<>(offerEntityList, pageRequest, offerEntityList.size())

        offerRepository.findAll(pageRequest) >> page
        offerMapper.mapListEntityToDto(offerEntityList) >> offerList

        when: "Pobieramy wszystkie oferty pracy"
        def result = offerService.findAllJobOffers(pageRequest)

        then: "Zwracana strona ofert zawiera poprawne elementy"
        result.content.size() == 1
        result.content[0].title == "Java Developer"
    }

    def "powinno dodac nowa oferte pracy"() {
        given: "Oferta do zapisania"
        def company = new CompanyDetails(1L,"company",524524, UserRole.COMPANY,123)
        def offerDto = new Offer(1L,"Java Developer","location","b2b",212.00, LocalDate.of(2025,02,28),"desc",company)
        def offerEntity = new OfferEntity(id: 1L, title: "Java Developer")

        offerMapper.mapDtoToEntity(offerDto) >> offerEntity
        offerRepository.save(offerEntity) >> offerEntity

        when: "Dodajemy oferte pracy"
        def result = offerService.addJobOffer(offerDto)

        then: "Oferta zostaje zapisana i zwrócona"
        result.id == 1L
        result.title == "Java Developer"
    }

    def "powinno rzucic wyjatek gdy oferta do edycji nie ma ID"() {
        given: "Oferta bez ID"
        def company = new CompanyDetails(1L,"company",524524, UserRole.COMPANY,123)
        def offerDto = new Offer(null,"Java Developer","location","b2b",212.00, LocalDate.of(2025,02,28),"desc",company)

        when: "Próbujemy edytować ofertę"
        offerService.editJobOffer(offerDto)

        then: "Rzuca wyjątek"
        thrown(RuntimeException)
    }

    def "powinno edytowac oferte pracy"() {
        given: "Istniejąca oferta do edycji"
        def company = new CompanyDetails(1L,"company",524524, UserRole.COMPANY,123)
        def offerDto = new Offer(1L,"Java Developer","location","b2b",212.00, LocalDate.of(2025,02,28),"desc",company)
        def offerEntity = offerMapper.mapDtoToEntity(offerDto)

        def offerToEdit = new Offer(1L,"Senior Java Developer","location","b2b",212.00, LocalDate.of(2025,02,28),"desc",company)

        offerRepository.save(offerEntity) >> offerEntity

        when: "Edytujemy ofertę pracy"
        def result = offerService.editJobOffer(offerToEdit)

        then: "Oferta zostaje edytowana i zwrócona"
        result.id == 1L
        result.title == "Senior Java Developer"
    }

    def "powinno znalezc oferty po ID firmy"() {
        given: "Oferty dla danego ID firmy"
        def pageRequest = PageRequest.of(0, 5)
        def offerEntityList = [new OfferEntity(id: 1L, title: "Java Developer")]
        def company = new CompanyDetails(1L,"company",524524, UserRole.COMPANY,123)
        def offerList = [new Offer(1L,"Java Developer","location","b2b",212.00, LocalDate.of(2025,02,28),"desc",company)]
        def page = new PageImpl<>(offerEntityList, pageRequest, offerEntityList.size())

        offerRepository.findOfferByCompanyId(1L, pageRequest) >> page
        offerMapper.mapListEntityToDto(offerEntityList) >> offerList

        when: "Pobieramy oferty dla firmy o ID 1"
        def result = offerService.findJobsOfferById(1L, pageRequest)

        then: "Zwracana strona zawiera poprawne oferty"
        result.content.size() == 1
        result.content[0].title == "Java Developer"
    }

    def "powinno usunac oferte pracy"() {
        given: "Oferta do usunięcia"
        def company = new CompanyDetails(1L,"company",524524, UserRole.COMPANY,123)
        def offerDto = new Offer(1L,"Java Developer","location","b2b",212.00, LocalDate.of(2025,02,28),"desc",company)

        def offerEntity = offerMapper.mapDtoToEntity(offerDto)

        offerRepository.findById(1L) >> Optional.of(offerEntity)

        when: "Usuwamy ofertę pracy"
        def result = offerService.deleteJobOffer(1L)

        then: "Oferta zostaje usunięta i zwrócona"
        result.id == 1L
        result.title == "Java Developer"
        1 * offerRepository.delete(offerEntity)
    }

    def "powinno rzucic wyjatek gdy usuwana oferta nie istnieje"() {
        given: "Brak oferty o podanym ID"
        offerRepository.findById(1L) >> Optional.empty()

        when: "Próbujemy usunąć ofertę"
        offerService.deleteJobOffer(1L)

        then: "Rzuca wyjątek"
        thrown(RuntimeException)
    }
}
