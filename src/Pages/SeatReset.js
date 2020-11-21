import React from 'react'
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import axios from 'axios';
const SeatReset = () => {

    const onClickReset = (e) => {
        swal({
            title: "ต้องการที่จะรีเซ็ทที่นั่งทั้งหมดใช่หรือไม่",
            text: "เมื่อรีเซ็ทแล้วที่นั่งทุกสาขาจะกลับมาเต็มทั้งหมด",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
            
            axios.post('http://localhost:8071/resetallseat')
            .then(() => {
                  swal("RESET SUCCESSFULLY.", {
                    icon: "success",
                  });
            })
            
            } else {
              
            }
          });
    }

    return (
        <div>
            <Button onClick={(e) => onClickReset(e)} variant="contained" color="secondary" >RESET</Button>
        </div>
    )
}

export default SeatReset
