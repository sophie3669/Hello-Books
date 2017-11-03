
/**
 * borrowed books dummy database
 */



const brwdBooks = {
    
    brwdBooksDb:[
        {
            "brwId": 1,

            "bookId": 1,

            "userId": 1,
            "dateBorrowed": "august,15th 2017",
            "dateToReturn" : "august,30th 2017",
            "brwApproval": "Approved",

            "rtnApproval":  "Not yet returned",
            "returnStatus": "Not yet yeturned",

            "dateReturned":  "Not yet returned"   

        },
        {
            "brwId": 2,
            "bookId": 2,

            "userId": 1,
            "dateBorrowed": "august,15th 2017",
            "dateToReturn" : "august,30th 2017",
            "brwApproval": "request made but yet to be approved",

            "rtnApproval":  "yet to be approved as returned",
            "returnStatus": "Not yet returned",
            "dateReturned":  "Not yet returned"   

        }
           
    ]
}

export default brwdBooks;
