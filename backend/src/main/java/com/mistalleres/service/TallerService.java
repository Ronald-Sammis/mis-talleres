package com.mistalleres.service;

import com.mistalleres.model.Taller;
import com.mistalleres.repository.TallerRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TallerService {

    @Autowired
    private TallerRepository tallerRepository;

    public List<Taller> getAllTalleres() {
        return tallerRepository.findAllByOrderByPropietarioAsc();
    }

    public Optional<Taller> getTallerById(Long id) {
        return tallerRepository.findById(id);
    }

    public Taller createTaller(@Valid Taller taller) {
        return tallerRepository.save(taller);
    }

    public Taller updateTaller(Long id, @Valid Taller taller) {
        if (!tallerRepository.existsById(id)) {
            throw new RuntimeException("Taller no encontrado con id: " + id);
        }
        taller.setId(id);
        return tallerRepository.save(taller);
    }

    public void deleteTaller(Long id) {
        if (!tallerRepository.existsById(id)) {
            throw new RuntimeException("Taller no encontrado con id: " + id);
        }
        tallerRepository.deleteById(id);
    }
}
