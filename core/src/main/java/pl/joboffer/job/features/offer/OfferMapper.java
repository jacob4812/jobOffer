package pl.joboffer.job.features.offer;

import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import pl.joboffer.job.common.mappers.DtoEntityMapper;
import pl.joboffer.job.dto.offer.Offer;

@Mapper(unmappedSourcePolicy = ReportingPolicy.ERROR, unmappedTargetPolicy = ReportingPolicy.ERROR)
public abstract class OfferMapper implements DtoEntityMapper<Offer, OfferEntity> {

  @Autowired
  public void setOfferRepository(OfferRepository offerRepository) {}

  @Override
  @Mapping(target = "company", source = "company", ignore = true)
  public abstract Offer mapEntityToDto(OfferEntity offerEntity);

  @Override
  @Mapping(target = "company.email", ignore = true) // Ignore email
  @Mapping(target = "company.password", ignore = true) // Ignore password
  public abstract OfferEntity mapDtoToEntity(Offer offer);

  @Override
  @BeanMapping(ignoreUnmappedSourceProperties = {,})
  public abstract List<Offer> mapListEntityToDto(List<OfferEntity> offerEntityList);

  @Override
  public abstract List<OfferEntity> mapListDtoToEntity(List<Offer> offerDtoList);
}
