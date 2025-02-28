package pl.joboffer.job.features.company;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import pl.joboffer.job.common.mappers.DtoEntityMapper;
import pl.joboffer.job.dto.company.CompanyDetails;
import pl.joboffer.job.dto.company.CompanyRegisterDetails;

@Mapper(unmappedSourcePolicy = ReportingPolicy.ERROR, unmappedTargetPolicy = ReportingPolicy.ERROR)
public abstract class CompanyMapper
    implements DtoEntityMapper<CompanyRegisterDetails, CompanyEntity> {
  @Mapping(target = "companyName", source = "companyName")
  @Mapping(target = "userRole", ignore = true)
  @Mapping(target = "email", source = "email")
  @Mapping(target = "password", source = "password")
  @Mapping(source = "id", target = "id")
  @Mapping(source = "nip", target = "nip")
  @Mapping(target = "phoneNumber", source = "phoneNumber")
  public abstract CompanyEntity mapDtoToEntity(CompanyRegisterDetails companyRegisterDetails);

  @Mapping(target = "companyName", source = "companyName")
  @Mapping(target = "id", source = "id")
  @Mapping(target = "email", source = "email")
  @Mapping(target = "password", source = "password")
  @BeanMapping(ignoreUnmappedSourceProperties = {"userRole", "phoneNumber"})
  public abstract CompanyRegisterDetails mapEntityToDto(CompanyEntity companyEntity);

  @Mapping(target = "companyName", source = "companyName")
  @Mapping(target = "id", source = "id")
  @Mapping(target = "phoneNumber", source = "phoneNumber")
  @Mapping(target = "nip", source = "nip")
  @Mapping(target = "userRole", source = "userRole")
  @BeanMapping(ignoreUnmappedSourceProperties = {"email", "password"})
  public abstract CompanyDetails mapEntityToCompanyDetails(CompanyEntity companyEntity);
}
