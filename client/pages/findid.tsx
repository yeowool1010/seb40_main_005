import CertifyPageLayout from "../components/CertifyPageLayout";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ErrorMessage } from "@hookform/error-message";
import { useState, useCallback } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import getIdByEmail from "../apis/user/getIdByEmail";

function FindId() {
  const [isData, setIsData] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  interface FormInputs {
    emailErrorInput: string;
  }

  const [emailValue, setEmailValue] = useState<string>("");
  const useGetIdByEmail = (email: string) => {
    return useQuery(["get/userGetIdByEmail"], () => getIdByEmail(email), {
      enabled: false,
    });
  };

  const { data, refetch, isLoading, isFetching } = useGetIdByEmail(emailValue);

  const handleEmailChange = (e: any) => {
    setEmailValue(e.target.value);
  };

  const handlePressEnter = (e: any) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      refetch();
      if (data?.data.id === undefined) {
        setIsData(true);
      }
    }
  };

  const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  return (
    <>
      <CertifyPageLayout>
        <>
          <div className="relative items-center justify-center w-fit h-7 ">
            <h2 className="z-10 text-base md:text-xl lg:text-2xl text-zinc-500 font-SCDream6">
              아이디 찾기
            </h2>
            <div className="absolute top-5 md:top-6 lg:top-7 left-0 right-0 bottom-1 md:bottom-0 lg:-bottom-1 bg-mainOrange/40"></div>
          </div>
          <form className="w-full">
            <div className="flex flex-col w-full h-fit">
              <div className="flex flex-col w-full h-fit">
                <div className="relative items-center justify-center w-fit h-7 mt-7">
                  <label
                    htmlFor="email"
                    className="font-SCDream5 text-gray-500 text-base"
                  >
                    E-mail
                  </label>
                  <div className="absolute top-4 md:top-4.5 lg:top-4 left-0 right-0 bottom-2 md:bottom-1.5 lg:bottom-1.5 bg-mainOrange/40"></div>
                </div>
                <input
                  className="font-SCDream3 text-gray-500 w-full text-sm mt-2 border-b-[1px] border-mainOrange/40 outline-none"
                  id="email"
                  type="text"
                  value={emailValue}
                  onKeyDown={handlePressEnter}
                  placeholder="E-mail을 입력 후 Enter를 눌러주세요"
                  {...register("emailErrorInput", {
                    required: "이메일 필수로 입력 해 주세요",
                    onChange: handleEmailChange,
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="emailErrorInput"
                  render={({ message }) => (
                    <div className="flex flex-row justify-end items-end w-full text-mainOrange h-fit font-SCDream2 text-xs mt-1">
                      {message}
                    </div>
                  )}
                />
                <div className="flex flex-row justify-end items-end w-full text-mainOrange h-fit font-SCDream2 text-xs mt-1">
                  {emailValue === ""
                    ? null
                    : emailValue.match(emailRegex)
                    ? "올바른 이메일 형식입니다"
                    : "이메일 형식이 올바르지 않습니다"}
                </div>
              </div>
            </div>
          </form>
          <div className="mb-16 w-full h-1/6 flex items-center justify-center text-mainOrange font-SCDream4 text-sm mt-1">
            {data ? (
              <div className="w-full h-2/3 mt-16 flex flex-col items-center justify-center">
                <p className="py-5">{`ID는 ${
                  data.data.id.slice(0, 4) + "*".repeat(data.data.id.length - 4)
                }입니다`}</p>
                <Link href="/login">
                  <button className="flex items-center py-2 justify-center w-4/6 md:w-3/6 lg:w-4/6 h-8 rounded-2xl bg-btnOrange text-white font-SCDream5 text-sm hover:bg-[#fcb79a]">
                    <span>로그인 페이지로 이동하기</span>
                  </button>
                </Link>
              </div>
            ) : emailValue && isData ? (
              <div className="w-full h-2/3 mt-16 flex flex-col items-center justify-center">
                <p className="py-5">존재 하지 않는 아이디 입니다</p>
                <Link href="/signup">
                  <button className="flex  items-center  py-2 justify-center w-4/6 md:w-3/6 lg:w-4/6 h-8 rounded-2xl bg-btnOrange text-white font-SCDream5 text-sm hover:bg-[#fcb79a]">
                    <span>회원가입 페이지로 이동하기</span>
                  </button>
                </Link>
              </div>
            ) : (
              <svg
                className="h-10 w-10 mt-10"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_364_3047)">
                  <path
                    d="M18.411 16.1685L13.9104 12.3412C13.4449 11.922 12.9473 11.7309 12.5459 11.7487C13.6087 10.5042 14.25 8.89036 14.25 7.12573C14.25 3.19036 11.0604 0.000732422 7.125 0.000732422C3.18963 0.000732422 0 3.19036 0 7.12573C0 11.0611 3.18963 14.2507 7.125 14.2507C8.88962 14.2507 10.5034 13.6095 11.7479 12.5467C11.7289 12.948 11.9213 13.4456 12.3405 13.9111L16.1678 18.4117C16.8233 19.1397 17.8932 19.2014 18.5464 18.5483C19.1995 17.8952 19.1378 16.824 18.4098 16.1697L18.411 16.1685ZM7.125 11.8745C4.50181 11.8745 2.375 9.74773 2.375 7.12455C2.375 4.50136 4.50181 2.37454 7.125 2.37454C9.74819 2.37454 11.875 4.50136 11.875 7.12455C11.875 9.74773 9.74819 11.8745 7.125 11.8745Z"
                    fill="#FF9264"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_364_3047">
                    <rect width="19" height="19" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}
          </div>

          <div className="w-full h-28 mt-4  flex flex-col items-center justify-center text-mainOrange font-SCDream4 text-xs ">
            <div className="py-5 flex flex-col items-center justify-center">
              <p>가입 시 사용한 이메일 주소를 입력하여</p>
              <p>아이디의 앞 4자리를 확인 하실 수 있습니다</p>
            </div>

            {/* <Link href="/login">
              <button className="flex items-center py-2 justify-center w-5/6 md:w-4/6 lg:w-5/6 h-8 rounded-2xl bg-btnOrange text-white font-SCDream5 text-sm hover:bg-[#fcb79a]">
                <span>이전 페이지로 돌아가기</span>
              </button>
            </Link> */}
          </div>
        </>
      </CertifyPageLayout>
    </>
  );
}

export default FindId;
