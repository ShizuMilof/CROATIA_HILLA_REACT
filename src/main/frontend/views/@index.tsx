import React, { useState } from 'react';
import { gapi } from 'gapi-script'; // Google API klijent


const CLIENT_ID = '914519159445-cuful0m02eq3g5ho4got0ta7ced1d0cr.apps.googleusercontent.com'; // Client ID
const API_KEY = 'AIzaSyDNVV1bcJN97vYJ-FinNMi0M4ilPCpcO2s'; // API ključ
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

const ReservationView = () => {
  const [message, setMessage] = useState<string | null>(null);

  const generateICSFileForIOS = () => {
    const event = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Termin u Croatia Poliklinici
DESCRIPTION:Pregled u Croatia Poliklinici. Molimo dođite na vrijeme.
LOCATION:Zagreb, Croatia
DTSTART:20250125T090000Z
DTEND:20250125T100000Z
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'termin.ics'; // Naziv datoteke
    link.click();

    URL.revokeObjectURL(url); // Oslobodi URL nakon preuzimanja
  };

  const handleAddToGoogleCalendar = () => {
    const eventTitle = 'Termin u Croatia Poliklinici';
    const eventDetails = 'Pregled u Croatia Poliklinici. Molimo dođite na vrijeme.';
    const eventLocation = 'Zagreb, Croatia';
    const startDateTime = '20250125T090000Z'; // Početak termina (UTC format)
    const endDateTime = '20250125T100000Z'; // Kraj termina (UTC format)

    // Kreiraj Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventTitle
    )}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(
      eventLocation
    )}&dates=${startDateTime}/${endDateTime}`;

    // Otvori Google Calendar URL u novom prozoru
    window.open(googleCalendarUrl, '_blank');
  };
  const handleAddToOutlookMobile = () => {
    const eventTitle = "Termin u Croatia Poliklinici";
    const eventDetails = "Pregled u Croatia Poliklinici. Molimo dođite na vrijeme.";
    const eventLocation = "Zagreb, Croatia";
    const startDateTime = "2025-01-25T10:00:00"; // Početak termina (lokalno vrijeme)
    const endDateTime = "2025-01-25T11:00:00"; // Kraj termina (lokalno vrijeme)
  
    // Generiraj Outlook URL
    const outlookMobileUrl = `https://outlook.live.com/calendar/0/deeplink/compose?rru=addevent&subject=${encodeURIComponent(
      eventTitle
    )}&body=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(
      eventLocation
    )}&startdt=${encodeURIComponent(startDateTime)}&enddt=${encodeURIComponent(
      endDateTime
    )}&allday=false`;
    window.open(outlookMobileUrl, "_blank");
  };


  const handleAction = async (action: string) => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/reservations?action=' + action,
        {
          method: 'POST',
        }
      );

      if (response.ok) {
        const data = await response.text();
        setMessage(data);

        setTimeout(() => {
          setMessage(null);
        }, 2000);
      } else {
        setMessage('Greška prilikom obrade zahtjeva.');

        setTimeout(() => {
          setMessage(null);
        }, 2000);
      }
    } catch (error) {
      console.error('Greška:', error);
      setMessage('Došlo je do greške!');
    }
  };

  const autoDownloadICSFile = () => {
    const event = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Termin u Croatia Poliklinici
DESCRIPTION:Pregled u Croatia Poliklinici. Molimo dođite na vrijeme.
LOCATION:Zagreb, Croatia
DTSTART:20250125T090000Z
DTEND:20250125T100000Z
END:VEVENT
END:VCALENDAR
    `.trim();

    // Kreiraj Blob objekt s .ics sadržajem
    const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);

    // Automatski preuzmi datoteku
    const link = document.createElement('a');
    link.href = url;
    link.download = 'termin.ics'; // Naziv datoteke
    link.click();

    // Oslobodi URL nakon preuzimanja
    window.URL.revokeObjectURL(url);

    // Pokaži poruku o preuzimanju
    setMessage('Datoteka je preuzeta. Otvorite je u aplikaciji Kalendar.');
    setTimeout(() => setMessage(null), 3000);
  };
  
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '50px',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 style={{ color: '#343a40', fontSize: '24px' }}>
        Croatia Poliklinika - Sustav za potvrđivanje i otkazivanje termina
      </h1>
      <img
        src="https://bucket.index.hr/b/index/75ba6541-5a50-4345-a3b4-e73ad7e31d74.jpg"
        alt="Croatia Poliklinika"
        style={{
          width: '400px',
          height: '350px',
          marginTop: '20px',
          borderRadius: '20px',
        }}
      />

      <div style={{ marginTop: '20px' }}>
        {/* Gumb za potvrđivanje termina */}
        <button
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
          onClick={() => handleAction('potvrdi')}
        >
          Potvrdi
        </button>



        {/* Gumb za otkazivanje termina */}
        <button
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
          onClick={() => handleAction('otkaži')}
        >
          Otkaži
        </button>
{/* Gumb za preuzimanje i otvaranje .ics datoteke */}
<button
  style={{
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#0078D4',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  }}
  onClick={autoDownloadICSFile}
>
  Preuzmi i Otvori Kalendar
</button>



{/* Gumb za dodavanje u Outlook Kalendar */}
<button
  style={{
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#0078D4',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
  }}
  onClick={handleAddToOutlookMobile}
>
  Dodaj u Outlook Kalendar
</button>

        {/* Gumb za dodavanje u Google Kalendar */}
        <button
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#0078D4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
          onClick={handleAddToGoogleCalendar}
        >
          Dodaj u Google Kalendar
        </button>

        {/* Gumb za dodavanje u iOS Kalendar */}
        <button
          style={{
            padding: '10px 20px',
            margin: '10px',
            backgroundColor: '#0078D4',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
          }}
          onClick={generateICSFileForIOS}
        >
          Dodaj u iOS Kalendar
        </button>
      </div>

      {message && (
        <p
          style={{
            marginTop: '20px',
            fontSize: '16px',
            color: '#007bff',
            fontWeight: 'bold',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ReservationView;
