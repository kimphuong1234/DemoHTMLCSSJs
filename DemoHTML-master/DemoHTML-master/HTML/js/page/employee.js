$(document).ready(function () {
    loadData();
})

/**
 * Load dữ liệu
 * CreatedBy: abc (26/12/2020)
 * */
function loadData() {
    //lấy dư liệu về:
    $.ajax({
        url: "http://api.manhnv.net/api/employees",
        method: "GET",
    }).done(function (res) {
        var data = res;

        $.each(data, function (index, item) {
            var dateOfBirth = item["DateOfBirth"];
            var salary = item.Salary;
            salary = formatMoney(salary);
            dateOfBirth = formatDate(dateOfBirth);
            var tr = $(`<tr>
                    <td><div><span>`+ item.EmployeeCode + `</span></div></td>
                    <td><div><span>`+ item["FullName"] + `</span></div></td>
                    <td><div><span>`+ item["GenderName"] + `</span></div></td>
                    <td><div><span>`+ dateOfBirth + `</span></div></td>
                    <td><div><span>`+ item["PhoneNumber"] + `</span></div></td>
                    <td><div><span>`+ item["Email"] + `</span></div></td>
                    <td><div><span>`+ item["PositionName"] + `</span></div></td>
                    <td><div><span>`+ item["DepartmentName"] + `</span></div></td>
                    <td><div><span>`+ salary + `</span></div></td>                    
                    <td style="max-width:200px"><span>`+ item["Address"] + `</span></td>
                    <td> <div><span>`+ item["WorkStatusName"] + `</span></div></td>
                    </tr>`);
            $('table tbody').append(tr);
            //debugger;
        })

    }).fail(function (res) {

    })
    //binding dư liệu lên table:

}

/**
 * format dữ liệu theo kiểu ngày tháng sang ngay/thang/nam
 * @param {any} date ({date} date) tham số có kiểu dữ liệu bất kỳ 
 * CreatedBy: abc (26/12/2020)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    }
    else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        day = day < 10 ? "0" + day : day; //trc dấu "?" là if sau dấu ":" là else. nếu day <10 thì 0 + day và ..
        month = month < 10 ? "0" + month : month;
        return day + '/' + month + '/' + year;
    }
}

/**
 * Hàm định dạng hiển thị tiền tệ
 * @param {any} money số tiền
 * CreatedBy: abc (26/12/2020)
 */
function formatMoney(money) {
    var num = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1. ");
    return num;
}

