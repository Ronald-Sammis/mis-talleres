package com.mistalleres.controller;

import com.mistalleres.model.Taller;
import com.mistalleres.service.TallerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/talleres")
@CrossOrigin(origins = {"http://localhost:4200", "${FRONTEND_URL:http://localhost:4200}"})
public class TallerController {

    @Autowired
    private TallerService tallerService;

    @GetMapping
    public ResponseEntity<List<Taller>> getAllTalleres() {
        List<Taller> talleres = tallerService.getAllTalleres();
        return ResponseEntity.ok(talleres);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Taller> getTallerById(@PathVariable Long id) {
        return tallerService.getTallerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Taller> createTaller(@Valid @RequestBody Taller taller) {
        Taller nuevoTaller = tallerService.createTaller(taller);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoTaller);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Taller> updateTaller(@PathVariable Long id, @Valid @RequestBody Taller taller) {
        try {
            Taller tallerActualizado = tallerService.updateTaller(id, taller);
            return ResponseEntity.ok(tallerActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTaller(@PathVariable Long id) {
        try {
            tallerService.deleteTaller(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
