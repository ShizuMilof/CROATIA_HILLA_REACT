package org.vaadin.example.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.vaadin.example.model.Reservation;
import org.vaadin.example.repository.ReservationRepository;
@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public String saveReservation(String action) {
        // Mapiranje akcije na šifru
        int actionCode = mapActionToCode(action);

        // Spremanje u bazu
        Reservation reservation = new Reservation();
        reservation.setActionCode(actionCode);
        reservationRepository.save(reservation);

        return "Radnja uspješno spremljena! Šifra: " + actionCode;
    }

    // Metoda za mapiranje akcije
    private int mapActionToCode(String action) {
        if ("potvrdi".equalsIgnoreCase(action)) {
            return 1;
        } else if ("otkaži".equalsIgnoreCase(action)) {
            return 2;
        }
        throw new IllegalArgumentException("Nepoznata akcija: " + action);
    }
}


