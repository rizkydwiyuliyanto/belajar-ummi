const soal = ["A", "B", "C", "D"]
const inputPilihan = (index) => {
    let currentIdx = index
    console.log(soal[currentIdx]);
    currentIdx += 1;
    if (currentIdx < soal.length) {
        inputPilihan(currentIdx);
    }
}
inputPilihan(0);
