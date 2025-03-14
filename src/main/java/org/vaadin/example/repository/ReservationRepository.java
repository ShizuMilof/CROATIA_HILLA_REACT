package org.vaadin.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.vaadin.example.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
