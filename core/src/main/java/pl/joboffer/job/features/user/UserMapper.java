package pl.joboffer.job.features.user;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import pl.joboffer.job.common.mappers.DtoEntityMapper;
import pl.joboffer.job.dto.user.UserRegisterDetails;

@Mapper(unmappedSourcePolicy = ReportingPolicy.ERROR, unmappedTargetPolicy = ReportingPolicy.ERROR)
public abstract class UserMapper implements DtoEntityMapper<UserRegisterDetails, UserEntity> {
  @Mapping(target = "login", source = "username")
  @Mapping(target = "userRole", ignore = true)
  @Mapping(target = "email", source = "email")
  @Mapping(target = "password", source = "password")
  @Mapping(source = "id", target = "id")
  @Mapping(target = "phoneNumber", ignore = true)
  public abstract UserEntity mapDtoToEntity(UserRegisterDetails userRegisterDetails);

  @Mapping(target = "username", source = "login")
  @Mapping(target = "id", source = "id")
  @Mapping(target = "email", source = "email")
  @Mapping(target = "password", source = "password")
  @BeanMapping(ignoreUnmappedSourceProperties = {"userRole","phoneNumber"})
  public abstract UserRegisterDetails mapEntityToDto(UserEntity userEntity);
}
