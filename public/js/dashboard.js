$(function () {
    $("#datepicker").datepicker({
      onSelect: function (dateText) {
        const selectedDate = new Date(dateText);
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // Fetch data for the selected date
        $.ajax({
          url: '/fetch-data',
          method: 'GET',
          data: { date: formattedDate },
          success: function (data) {
            $('#data-container').empty();
            if (data.length > 0) {
              data.forEach(feed => {
                $('#data-container').append(`<p>Created at: ${feed.created_at}</p>`);
                $('#data-container').append(`<p>Field1: ${feed.field1}</p>`);
                $('#data-container').append(`<p>Field2: ${feed.field2}</p>`);
                $('#data-container').append(`<p>Field3: ${feed.field3}</p>`);
                $('#data-container').append(`<p>Field4: ${feed.field4}</p>`);
                $('#data-container').append(`<p>Field5: ${feed.field5}</p>`);
                $('#data-container').append(`<p>Field6: ${feed.field6}</p>`);
                $('#data-container').append(`<p>Field7: ${feed.field7}</p>`);
                $('#data-container').append(`<p>Field8: ${feed.field8}</p>`);
              });
            } else {
              $('#data-container').append('<p>No data available for the selected date.</p>');
            }
          },
          error: function (error) {
            console.error('Error fetching data:', error);
          }
        });
      }
    });
  });