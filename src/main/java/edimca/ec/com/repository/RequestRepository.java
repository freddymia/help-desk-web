package edimca.ec.com.repository;

import edimca.ec.com.domain.Request;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Request entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RequestRepository extends JpaRepository<Request, Long> {

    @Query("select request from Request request where request.technician.login = ?#{principal.username}")
    List<Request> findByTechnicianIsCurrentUser();

}
