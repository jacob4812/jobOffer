package pl.joboffer.job.features.company;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import pl.joboffer.job.common.mappers.DtoEntityMapper;
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
  @Mapping(target = "offers", ignore = true)
  public abstract CompanyEntity mapDtoToEntity(CompanyRegisterDetails companyRegisterDetails);

  @Mapping(target = "companyName", source = "companyName")
  @Mapping(target = "id", source = "id")
  @Mapping(target = "email", source = "email")
  @Mapping(target = "password", source = "password")
  @BeanMapping(ignoreUnmappedSourceProperties = {"userRole", "phoneNumber", "offers"})
  public abstract CompanyRegisterDetails mapEntityToDto(CompanyEntity companyEntity);
}
