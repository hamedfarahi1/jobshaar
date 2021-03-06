package ir.khu.jaobshaar.repository;

import ir.khu.jaobshaar.entity.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findAllByEmployerId(long employerId);
}
