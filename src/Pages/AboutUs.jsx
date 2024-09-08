import './AboutUs.scss'

function AboutUs() {
     return (
          <>
               <h1>About Us</h1>
               <p className="group-name">Group 3: SWP Mentor Booking System</p>

               <div className="row">
                    <div className="card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                         <img src="/src/assets/members/Huy.jpg" className="card-img-top" alt="Huy" />
                         <div className="card-body">
                              <h5>Team Member</h5>
                              <h5 className="card-title">Lê Phạm Trường Huy<br />(SE180758)</h5>
                              <p className="card-text">Frontend Developer</p>
                         </div>
                    </div>

                    <div className="card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                         <img src="/src/assets/members/Hoang.jpg" className="card-img-top" alt="Hoang" />
                         <div className="card-body">
                              <h5>Team Member</h5>
                              <h5 className="card-title">Đinh Việt Hoàng<br />(SE180638)</h5>
                              <p className="card-text">Backend Developer</p>
                         </div>
                    </div>

                    <div className="card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                         <img src="/src/assets/members/Trong.jpg" className="card-img-top" alt="Trong" />
                         <div className="card-body">
                              <h5>Team Leader</h5>
                              <h5 className="card-title">Nguyễn Huỳnh Bảo Trọng<br />(SE180600)</h5>
                              <p className="card-text">Frontend Developer</p>
                         </div>
                    </div>

                    <div className="card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                         <img src="/src/assets/members/Long.jpg" className="card-img-top" alt="Long" />
                         <div className="card-body">
                              <h5 className="role">Team Member</h5>
                              <h5 className="card-title">Hoàng Kim Long<br />(SE180705)</h5>
                              <p className="card-text">Backend Developer</p>
                         </div>
                    </div>

                    <div className="card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                         <img src="/src/assets/members/Hao.jpg" className="card-img-top" alt="Hao" />
                         <div className="card-body">
                              <h5>Team Member</h5>
                              <h5 className="card-title">Mai Nhật Hào<br />(SE180609)</h5>
                              <p className="card-text">Backend Developer</p>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default AboutUs