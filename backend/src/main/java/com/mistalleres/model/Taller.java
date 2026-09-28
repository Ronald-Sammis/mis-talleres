package com.mistalleres.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name = "talleres")
public class Taller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El propietario es obligatorio")
    private String propietario;

    @NotBlank(message = "La dirección es obligatoria")
    private String direccion;

    @NotBlank(message = "El link de Google Maps es obligatorio")
    @Pattern(regexp = "^https?://.*", message = "El link debe ser una URL válida (http o https)")
    private String linkGoogleMaps;

    public Taller() {
    }

    public Taller(String propietario, String direccion, String linkGoogleMaps) {
        this.propietario = propietario;
        this.direccion = direccion;
        this.linkGoogleMaps = linkGoogleMaps;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPropietario() {
        return propietario;
    }

    public void setPropietario(String propietario) {
        this.propietario = propietario;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getLinkGoogleMaps() {
        return linkGoogleMaps;
    }

    public void setLinkGoogleMaps(String linkGoogleMaps) {
        this.linkGoogleMaps = linkGoogleMaps;
    }
}
