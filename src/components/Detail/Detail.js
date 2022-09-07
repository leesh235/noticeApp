import "./Detail.css";

export const Detail = ({ id, closeFunc }) => {
    return (
        <article className="modal">
            <div className="box">
                <section id="top">
                    <div>제목: {id}</div>
                    <div>작성자</div>
                    <div>작성일</div>
                    <div>수정일</div>
                    <div onClick={closeFunc}>X</div>
                </section>
                <section id="contents"></section>
            </div>
        </article>
    );
};
