package pl.joboffer.job.common.mappers;

import java.util.List;

public interface DtoEntityMapper<DTO, ENTITY> {

  ENTITY mapDtoToEntity(DTO dto);

  DTO mapEntityToDto(ENTITY entity);

  List<ENTITY> mapListDtoToEntity(List<DTO> dto);

  List<DTO> mapListEntityToDto(List<ENTITY> entity);
}
