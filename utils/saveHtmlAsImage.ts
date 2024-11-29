import html2canvas from 'html2canvas';

export default function (htmlElement: HTMLElement, backgroundColor = '#fff') {
	html2canvas(htmlElement, { backgroundColor }).then((canvas) => {
		const imageUrl = canvas.toDataURL('image/png');

		const link = document.createElement('a');
		link.href = imageUrl;
		link.download = 'graph.png';
		link.click();
	});
}
