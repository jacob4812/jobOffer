package pl.joboffer.job.features.user;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import pl.joboffer.job.common.mappers.DtoEntityMapper;
import pl.joboffer.job.dto.user.UserDetails;

@Mapper(unmappedSourcePolicy = ReportingPolicy.ERROR, unmappedTargetPolicy = ReportingPolicy.ERROR)
public abstract class UserDetailsMapper implements DtoEntityMapper<UserDetails, UserEntity> {
  @Override
  @Mapping(target = "email", ignore = true)
  @Mapping(target = "password", ignore = true)
  @Mapping(target = "phoneNumber", source = "phoneNumber")
  public abstract UserEntity mapDtoToEntity(UserDetails userDetails);

  @Override
  @BeanMapping(ignoreUnmappedSourceProperties = {"email", "password"})
  public abstract UserDetails mapEntityToDto(UserEntity userEntity);
}
