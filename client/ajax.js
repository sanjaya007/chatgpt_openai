function postData(url, data, successCb) {
  $.ajax({
    url: url,
    data: data,
    type: "POST",
    contentType: "application/json",
    success: successCb,
  });
}

function postFormData(url, formData, successCb) {
  $.ajax({
    url: url,
    data: formData,
    processData: false,
    contentType: false,
    type: "POST",
    success: successCb,
  });
}

function getData(url, successCb) {
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json",
    success: successCb,
  });
}

function deleteData(url, successCb) {
  $.ajax({
    url: url,
    type: "Delete",
    success: successCb,
  });
}

export { postData, postFormData, getData, deleteData };
