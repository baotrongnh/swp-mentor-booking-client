import { Skeleton } from "antd";

export default function SkeletonLoading() {
     return (
          <div style={{height: '80vh', padding: '40px 0'}}>
               <div className="container">
                    <Skeleton
                         paragraph={{
                              rows: 5,
                         }}
                    />
               </div>
          </div>
     )
}
