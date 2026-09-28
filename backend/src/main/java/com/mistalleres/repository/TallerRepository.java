package com.mistalleres.repository;

import com.mistalleres.model.Taller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TallerRepository extends JpaRepository<Taller, Long> {
    List<Taller> findAllByOrderByPropietarioAsc();
}
