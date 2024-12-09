package pl.joboffer.job.features.offer;

import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import pl.joboffer.job.common.mappers.DtoEntityMapper;
import pl.joboffer.job.dto.offer.Offer;
import pl.joboffer.job.features.company.CompanyMapper;

@Mapper(uses = CompanyMapper.class,unmappedSourcePolicy = ReportingPolicy.ERROR, unmappedTargetPolicy = ReportingPolicy.ERROR)
public abstract class OfferMapper implements DtoEntityMapper<Offer, OfferEntity> {

  @Autowired
  public void setOfferRepository(OfferRepository offerRepository) {}

  @Override
  @Mapping(target = "company", source = "company") // Use CompanyMapper for nested mapping
  @BeanMapping(ignoreUnmappedSourceProperties = {"applications"})
  public abstract Offer mapEntityToDto(OfferEntity offerEntity);

  @Override
  @Mapping(target = "company", ignore = true) // Assuming you don’t need nested mapping back
  @Mapping(target = "applications", ignore = true)
  @BeanMapping(ignoreUnmappedSourceProperties = {"company"})
  public abstract OfferEntity mapDtoToEntity(Offer offer);

  @Override

  public abstract List<Offer> mapListEntityToDto(List<OfferEntity> offerEntityList);

  @Override
  public abstract List<OfferEntity> mapListDtoToEntity(List<Offer> offerDtoList);
}
