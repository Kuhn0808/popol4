import { useEffect, useState } from "react";
import { API_URL } from "../../../config/contansts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Upload } from "antd";

function Edit(props) {
  const navigate = useNavigate();
  const editdata = props.data.filter((item) => item.id == props.id);
  console.log(editdata);
  const [categort1, setCategory1] = useState(editdata[0].kinds);
  const [selectedTag, setSelectedTag] = useState(editdata[0].tags);
  const [kname, setKname] = useState(editdata[0].kname);
  const [ename, setEname] = useState(editdata[0].ename);
  const [coment, setComent] = useState(editdata[0].coment);
  const [price, setPrice] = useState(editdata[0].price);
  const [status, setStatus] = useState(editdata[0].status);
  const [kcal, setKcal] = useState(editdata[0].ingred_kcal);
  const [protein, setProtein] = useState(editdata[0].ingred_protein);
  const [fat, setFat] = useState(editdata[0].ingred_fat);
  const [sugars, setSugars] = useState(editdata[0].ingred_sugars);
  const [salt, setSalt] = useState(editdata[0].ingred_salt);
  const [gram, setGram] = useState(editdata[0].ingred_gram);
  const [imageUrl, setImageUrl] = useState(editdata[0].image_url);

  const handleCategorySelect1Change = (event) => {
    const value = event.target.value;
    if (value === "") {
      setCategory1(value);
      setCategory1(value);
    } else {
      setCategory1(value);
    }
  };

  const onChangeImage = (info) => {
    // 파일이 업로드 중일 때
    console.log("new", info.file);
    if (info.file.status === "uploading") {
      console.log("업로드중");
      return;
    }
    // 파일이 업로드 완료 되었을 때
    if (info.file.status === "done") {
      console.log("성공");
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      // 받은 이미지경로를 imageUrl에 넣어줌
      setImageUrl(imageUrl);
    }
  };

  const updateDataItem = (e) => {
    e.preventDefault();
    axios
      .patch(`${API_URL}/food/admin`, {
        id: props.id,
        kname: kname,
        ename: ename,
        coment: coment,
        price: price,
        status: status,
        ingred_kcal: kcal,
        ingred_protein: protein,
        ingred_fat: fat,
        ingred_sugars: sugars,
        ingred_salt: salt,
        kinds: categort1,
        tags: selectedTag,
        ingred_gram: gram,
        image_url: imageUrl,
      })
      .then((response) => {
        console.log("데이터 업데이트 성공");
        navigate("/admin/product/none");
        window.location.reload();
      })
      .catch((error) => {
        console.error("데이터 업데이트 실패:", error);
      });
  };

  return (
    <div>
      <div
        className="CHM_adminProductPageSubTitle"
        style={{ fontSize: "1.8vw" }}
      >
        상품 정보 수정
      </div>
      <div className="CHM_plusformBox">
        <form onSubmit={updateDataItem}>
          <div className="CHM_plustable1grid">
            <div className="CHM_plustablegrid">
              <div className="CHM_plusTableTitle">상품명(한국어)</div>
              <input
                placeholder="한국이름"
                value={kname}
                onChange={(e) => {
                  setKname(e.target.value);
                }}
              ></input>
            </div>
            <div className="CHM_plustablegrid">
              <div className="CHM_plusTableTitle">상품명(영어)</div>
              <input
                placeholder="영어이름"
                value={ename}
                onChange={(e) => {
                  setEname(e.target.value);
                }}
              ></input>
            </div>
          </div>

          <div className="CHM_plustable1grid">
            <div className="CHM_plustablegrid">
              <div className="CHM_plusTableTitle">종류</div>
              <select
                value={categort1}
                onChange={handleCategorySelect1Change}
                id="categorySelect1"
                style={{
                  marginLeft: "1vw",
                  padding: "0.3vw",
                  fontSize: "1.3vw",
                  width: "70%",
                }}
              >
                <option value="">=카테고리선택=</option>
                <option value="0">샌드위치</option>
                <option value="1">랩ㆍ기타</option>
                <option value="2">샐러드</option>
                <option value="3">아침메뉴</option>
                <option value="4">스마일 썹</option>
                <option value="5">단체메뉴</option>
              </select>
            </div>
            <div className="CHM_plustablegrid">
              <div className="CHM_plusTableTitle">태그</div>
              {categort1 == "0" && (
                <select
                  id="categorySelect2"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  style={{
                    marginLeft: "1vw",
                    padding: "0.3vw",
                    fontSize: "1.3vw",
                    width: "70%",
                  }}
                >
                  <option value="">=카테고리선택=</option>
                  <option value="0">클래식</option>
                  <option value="1">프레쉬&라이트</option>
                  <option value="2">프리미엄</option>
                  <option value="3">신제품</option>
                </select>
              )}

              {categort1 == "1" && (
                <select
                  id="categorySelect2"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  style={{
                    marginLeft: "1vw",
                    padding: "0.3vw",
                    fontSize: "1.3vw",
                    width: "70%",
                  }}
                >
                  <option value="">=카테고리선택=</option>
                  <option value="4">시그니처 랩</option>
                  <option value="5">미니 랩</option>
                </select>
              )}

              {categort1 == "2" && (
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  id="categorySelect2"
                  style={{
                    marginLeft: "1vw",
                    padding: "0.3vw",
                    fontSize: "1.3vw",
                    width: "70%",
                  }}
                >
                  <option value="">=카테고리선택=</option>
                  <option value="6">클래식</option>
                  <option value="7">프레쉬&라이트</option>
                  <option value="8">프리미엄</option>
                  <option value="9">신제품</option>
                </select>
              )}

              {categort1 == "3" && (
                <select
                  id="categorySelect2"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  style={{
                    marginLeft: "1vw",
                    padding: "0.3vw",
                    fontSize: "1.3vw",
                    width: "70%",
                  }}
                >
                  <option value="">=카테고리선택=</option>
                  <option value="10">샌드위치</option>
                  <option value="11">랩</option>
                </select>
              )}

              {categort1 == "4" && (
                <select
                  id="categorySelect2"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  style={{
                    marginLeft: "1vw",
                    padding: "0.3vw",
                    fontSize: "1.3vw",
                    width: "70%",
                  }}
                >
                  <option value="">=카테고리선택=</option>
                  <option value="12">스마일 썹</option>
                </select>
              )}

              {categort1 == "5" && (
                <select
                  id="categorySelect2"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  style={{
                    marginLeft: "1vw",
                    padding: "0.3vw",
                    fontSize: "1.3vw",
                    width: "70%",
                  }}
                >
                  <option value="">=카테고리선택=</option>
                  <option value="13">샌드위치</option>
                  <option value="14">쿠키</option>
                </select>
              )}
            </div>
          </div>

          <div className="CHM_plustable1grid">
            <div className="CHM_plustablegrid">
              <div className="CHM_plusTableTitle">가격</div>
              <input
                placeholder="가격"
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></input>
            </div>
            <div className="CHM_plustablegrid">
              <div className="CHM_plusTableTitle">판매여부</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <label style={{ paddingRight: "1vw" }}>
                  <input
                    type="radio"
                    name="salesStatus"
                    value="0"
                    checked={status === 0}
                    onChange={() => setStatus(0)}
                    style={{ marginRight: "0.5vw", width: "auto", padding: 0 }}
                  />
                  출시
                </label>
                <label style={{ paddingRight: "1vw" }}>
                  <input
                    type="radio"
                    name="salesStatus"
                    value="1"
                    checked={status === 1}
                    onChange={() => setStatus(1)}
                    style={{ marginRight: "0.5vw", width: "auto", padding: 0 }}
                  />
                  품절
                </label>
                <label style={{ paddingRight: "1vw" }}>
                  <input
                    type="radio"
                    name="salesStatus"
                    value="2"
                    checked={status === 2}
                    onChange={() => setStatus(2)}
                    style={{ marginRight: "0.5vw", width: "auto", padding: 0 }}
                  />
                  판매종료
                </label>
              </div>
            </div>
          </div>

          <div className="CHM_plustablegrid3">
            <div className="CHM_plusTableTitle">상품설명</div>
            <input
              placeholder="상품설명"
              style={{ width: "90%" }}
              value={coment}
              onChange={(e) => {
                setComent(e.target.value);
              }}
            ></input>
          </div>

          <div className="CHM_plustable6grid">
            <div className="CHM_plustablegrid2">
              <div className="CHM_plusTableTitle">칼로리</div>
              <input
                value={kcal}
                type="number"
                onChange={(e) => {
                  setKcal(e.target.value);
                }}
              ></input>
            </div>
            <div className="CHM_plustablegrid2">
              <div className="CHM_plusTableTitle">무게(g)</div>
              <input
                value={gram}
                type="number"
                onChange={(e) => {
                  setGram(e.target.value);
                }}
              ></input>
            </div>
            <div className="CHM_plustablegrid2">
              <div className="CHM_plusTableTitle">단백질</div>
              <input
                value={protein}
                type="number"
                onChange={(e) => {
                  setProtein(e.target.value);
                }}
              ></input>
            </div>
            <div className="CHM_plustablegrid2">
              <div className="CHM_plusTableTitle">포화지방</div>
              <input
                value={fat}
                type="number"
                onChange={(e) => {
                  setFat(e.target.value);
                }}
              ></input>
            </div>
            <div className="CHM_plustablegrid2">
              <div className="CHM_plusTableTitle">당류</div>
              <input
                value={sugars}
                type="number"
                onChange={(e) => {
                  setSugars(e.target.value);
                }}
              ></input>
            </div>
            <div className="CHM_plustablegrid2">
              <div className="CHM_plusTableTitle">나트륨</div>
              <input
                value={salt}
                type="number"
                onChange={(e) => {
                  setSalt(e.target.value);
                }}
              ></input>
            </div>
          </div>

          <div className="CHM_plustablegrid3">
            <div className="CHM_plusTableTitle">이미지</div>
            <Upload
              name="image"
              action={`${API_URL}/image`}
              listType="picture"
              showUploadList={false}
              onChange={onChangeImage}
            >
              {imageUrl ? (
                <p>{imageUrl}</p>
              ) : (
                <div id="upload-img-placeholder">
                  <i class="fa-regular fa-file-image"></i>
                  <br />
                  <span>제품사진을 등록 해주세요.</span>
                </div>
              )}
            </Upload>
          </div>

          <div className="CHM_plusPageBtnBox">
            <button type="submit">상품수정</button>
            <button>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
