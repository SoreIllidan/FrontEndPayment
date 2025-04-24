 // Navigation
 document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const pageContents = document.querySelectorAll('.page-content');
    
    // Setup navigation
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        const pageName = this.getAttribute('data-page');
        
        // Handle "More" dropdown on mobile
        if (pageName === 'more') {
          return;
        }
        
        // Deactivate all menu items and hide all pages
        menuItems.forEach(i => i.classList.remove('active'));
        pageContents.forEach(p => p.classList.add('d-none'));
        
        // Activate clicked menu item and show corresponding page
        menuItems.forEach(i => {
          if (i.getAttribute('data-page') === pageName) {
            i.classList.add('active');
          }
        });
        
        const targetPage = document.getElementById(pageName + '-page');
        if (targetPage) {
          targetPage.classList.remove('d-none');
        }
        
        // Save last view to localStorage
        localStorage.setItem('lastView', pageName);
      });
    });
    
    // Initialize Calendar
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
          {
            title: 'Reunión de equipo',
            start: '2025-05-18T09:30:00',
            end: '2025-05-18T11:00:00',
            className: 'internal'
          },
          {
            title: 'Revisión de proyecto',
            start: '2025-05-20T14:00:00',
            end: '2025-05-20T15:30:00',
            className: 'client'
          },
          {
            title: 'Entrega de informe',
            start: '2025-05-22',
            allDay: true,
            className: 'internal'
          }
        ],
        eventClick: function(info) {
          $('#eventModal').modal('show');
        },
        dateClick: function(info) {
          $('#eventModal').modal('show');
        }
      });
      calendar.render();
    }
    
    // Report generation
    const generateReportBtn = document.getElementById('generateReport');
    const reportLoading = document.getElementById('reportLoading');
    const reportResult = document.getElementById('reportResult');
    
    if (generateReportBtn) {
      generateReportBtn.addEventListener('click', function() {
        reportLoading.classList.remove('d-none');
        
        // Simulate API call
        setTimeout(() => {
          reportLoading.classList.add('d-none');
          reportResult.innerHTML = `
            <div class="text-center mb-4">
              <h5>Reporte de Actividad por Proyecto</h5>
              <p class="text-muted">Mayo 2025</p>
            </div>
            <canvas id="reportChart" width="400" height="200"></canvas>
            <div class="d-flex justify-content-end mt-4">
              <button class="btn btn-outline-primary me-2">
                <i class='bx bx-download'></i> Descargar PDF
              </button>
              <button class="btn btn-outline-primary">
                <i class='bx bx-spreadsheet'></i> Exportar Excel
              </button>
            </div>
          `;
          
          // Initialize chart
          const ctx = document.getElementById('reportChart');
          const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Rediseño Web', 'App Móvil', 'Integración CRM', 'Sistema Inventario', 'Portal Cliente'],
              datasets: [{
                label: 'Tareas completadas',
                data: [12, 8, 5, 7, 15],
                backgroundColor: '#7B68EE'
              }, {
                label: 'Tareas pendientes',
                data: [5, 10, 15, 3, 4],
                backgroundColor: '#40E0D0'
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        }, 1500);
      });
    }
    
    // Load last view from localStorage if available
    const lastView = localStorage.getItem('lastView');
    if (lastView) {
      const defaultItem = document.querySelector(`.menu-item[data-page="${lastView}"]`);
      if (defaultItem) {
        defaultItem.click();
      }
    }
  });