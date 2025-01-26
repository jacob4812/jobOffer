package pl.joboffer.job.features.CVupload;


import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import pl.joboffer.job.features.user.UserEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Setter
@Getter
@Entity
@Table(name = "CvUpload")
public class CvEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id" ,updatable = false,nullable = false)
    Long id;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private String fileType;

    @Lob
    private byte[] data;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
}
