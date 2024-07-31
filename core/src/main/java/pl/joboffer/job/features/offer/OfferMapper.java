package pl.joboffer.job.features.offer;

import java.util.List;
import java.util.Optional;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import pl.joboffer.job.common.mappers.DtoEntityMapper;
import pl.joboffer.job.dto.Offer;

@Mapper(unmappedSourcePolicy = ReportingPolicy.ERROR, unmappedTargetPolicy = ReportingPolicy.ERROR)
public abstract class OfferMapper implements DtoEntityMapper<Offer, OfferEntity> {
  public abstract Offer mapEntityToDto(Optional<OfferEntity> offerEntity);

  @Override
  public abstract OfferEntity mapDtoToEntity(Offer offer);

  @Override
  public abstract List<Offer> mapListEntityToDto(List<OfferEntity> offerEntityList);

  @Override
  public abstract List<OfferEntity> mapListDtoToEntity(List<Offer> offerDtoList);
}
