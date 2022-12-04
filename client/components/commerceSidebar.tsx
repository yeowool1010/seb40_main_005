import MySidebarCategory from "./MySidebarCategory";
import { useRecoilState } from "recoil";
import { categorySelectTitle } from "../recoil/calendarAtom";
import useDeleteUser from "../hooks/user/useDeleteUser";
import Router from "next/router";

interface Props {
  onClick: () => void;
}

interface CategoryValue {
  mtCategory: string;
}

const StoreSidebar = ({ onClick }: Props) => {
  const myCategory = [
    {
      mtCategory: "테마",
    },
    {
      mtCategory: "앨범",
    },
  ];

  const [categoryTitle, setcategoryTitle] =
    useRecoilState<string>(categorySelectTitle);

  const renderNotices = () => {
    const categoryListArr: any[] = [];

    if (myCategory) {
      myCategory.map((data: CategoryValue, idx: number) => {
        categoryListArr?.push(
          <MySidebarCategory
            key={idx}
            categoryTitle={data.mtCategory}
            selectedTitle={categoryTitle}
            onClick={() => handleClick(data.mtCategory)}
          ></MySidebarCategory>,
        );
      });
    }

    return categoryListArr;
  };

  const handleClick = (title: string) => {
    setcategoryTitle(title);
  };

  const { mutate: deleteUser } = useDeleteUser();

  const DeleteUser = () => {
    let deleteCheck = window.confirm(
      "탈퇴 하실 경우 작성하신 모든 게시물 중 공유 된 게시글 외에는 전부 삭제됩니다. \n탈퇴를 진행하시려면 확인을 눌러 주세요.",
    );
    if (deleteCheck) {
      deleteUser();
      // handleReadCloseClick();
      Router.push("/");
      // window.location.reload();
    }
  };

  return (
    <>
      <div className="z-50  p-3 hidden md:flex lg:flex flex-col bg-white w-[20rem] md:ml-8 md:w-2/12 md:min-w-[10rem] drop-shadow-2xl justify-between">
        <div className="flex flex-col justify-between ">
          <div className="relative flex justify-center w-full h-5 my-3">
            <div className="z-10 text-xl text-zinc-500 font-SCDream6 ">
              스토어
            </div>
            <div className="absolute w-24 h-2 top-[1.1rem]  md:w-[4rem] md:top-4 bg-mainOrange/40"></div>
          </div>
          <div className="grid w-full grid-cols-1 mt-5 text-sm lg:flex lg:flex-col h-fit lg:h-5/6 font-SCDream4">
            {renderNotices()}
          </div>
        </div>
        <button
          onClick={DeleteUser}
          className="flex justify-end pb-3 pr-4 text-xs text-red-600 cursor-pointer"
        >
          회원탈퇴
        </button>
      </div>
    </>
  );
};

export default StoreSidebar;