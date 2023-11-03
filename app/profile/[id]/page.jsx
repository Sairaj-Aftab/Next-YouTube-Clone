import MainPages from "@/app/components/MainPages";
import ProfilePage from "@/app/components/ProfilePage";

function Profile({ params }) {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/sign");
  //   },
  // });

  return (
    <MainPages>
      <ProfilePage params={params} />
    </MainPages>
  );
}

export default Profile;
