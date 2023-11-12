import MainPages from "./components/MainPages";
import MainView from "./components/MainView/MainView";

export default async function Home() {
  return (
    <MainPages>
      <MainView />
    </MainPages>
  );
}
