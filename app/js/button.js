(function () {
  $('button#fishes').click(function () {
    getData('fishes');
  });

  function getData(group) {
    var url = 'http://localhost:5010/hucs?f=topojson&bbox=' + current.bbox.tuple;

    $.getJSON(url).done(addTopoData);
  }

})();
