package pl.joboffer.job.features.offer;

import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import pl.joboffer.job.common.mappers.DtoEntityMapper;
import pl.joboffer.job.dto.offer.Offer;

@Mapper(unmappedSourcePolicy = ReportingPolicy.ERROR, unmappedTargetPolicy = ReportingPolicy.ERROR)
public abstract class OfferMapper implements DtoEntityMapper<Offer, OfferEntity> {

  @Autowired
  public void setOfferRepository(OfferRepository offerRepository) {}

  @Override
  @BeanMapping(ignoreUnmappedSourceProperties = {,})
  public abstract Offer mapEntityToDto(OfferEntity offerEntity);

  @Override
  public abstract OfferEntity mapDtoToEntity(Offer offer);

  @Override
  @BeanMapping(ignoreUnmappedSourceProperties = {,})
  public abstract List<Offer> mapListEntityToDto(List<OfferEntity> offerEntityList);

  @Override
  public abstract List<OfferEntity> mapListDtoToEntity(List<Offer> offerDtoList);
}
