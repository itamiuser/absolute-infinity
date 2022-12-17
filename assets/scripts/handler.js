
const burger = document.querySelector('.header-burger')
const menu = document.querySelector('.burger-menu')

const fileinput = document.querySelector('input[name="files"]')
const fileslist = document.querySelector('.fileslist')
const cloud_img = document.querySelector('.cloud-img')

const searchinput = document.querySelector('.search-input')
const elements = document.querySelector('.elements')
	
if (window.screen.width < 1200) {
	const wrongtext = document.querySelector('.servericon').nextElementSibling
	wrongtext.innerHTML = `
	<p>В <b>первом окне</b> можно <span class="pnk">найти и скачать</span> загруженные на сайт файлы, при помощи строки поиска.</p>
	<p>Во <b>втором окне</b> можно <span class="prp">загрузить файлы на сайт</span>, что бы потом другие могли их найти и скачать.</p>
	`
}

const burgerMenuAnimation = () => {
	burger.classList.toggle('burger__active')
	menu.classList.toggle('burger-menu__active')
}

function createNode(tag, html, classes = []) {
	node = document.createElement(tag)
	if (classes.length) { node.classList.add(...classes) }
	if (html) {	node.innerHTML = html }
	return node
}

const filesToFileList = () => {
	fileslist.innerHTML = ''

	if (fileslist.classList.contains('none')) {
		if (fileinput.files.length > -1) {
			cloud_img.classList.add('none')
			fileslist.classList.remove('none')
		}
	}

	for (var i = 0; i < fileinput.files.length; i++) {
		var filename = fileinput.files.item(i).name
		let new_file = createNode('span', `${filename}`)
		fileslist.insertAdjacentElement('beforeend', new_file)
	}
}

var filesInFolder = [{name: 'cats.png', size: 10, type: 'png'}, 
					{name: 'longfilename', size: 10, type: 'file'}, 
					{name: 'pythoncode.py', size: 10, type: 'py'}, 
					{name: 'script.js', size: 10, type: 'js'},
					{name: 'text.txt', size: 10, type: 'txt'}, 
					{name: 'document20011021.docx', size: 10, type: 'docx'}, 
					{name: 'sosiska.exe', size: 10, type: 'exe'}, 
					{name: 'cube.jpeg', size: 10, type: 'jpeg'},
					{name: 'photoshop.psd', size: 10, type: 'psd'}, 
					{name: 'test.php', size: 10, type: 'txt'}, 
					{name: 'graphic.svg', size: 10, type: 'svg'}, 
					{name: 'asdwqeqwe.png', size: 10, type: 'png'},
					{name: 'saddog.jpg', size: 10, type: 'jpg'}, 
					{name: 'short', size: 10, type: 'file'}, 
					{name: 'русскийфайл.jpg', size: 10, type: 'jpg'}, 
					{name: '123.jpg', size: 10, type: 'jpg'},]

const searchFile = () => {
	elements.classList.add('none')
	elements.innerHTML = ''
	if (searchinput.value != '') {
		elements.classList.remove('none')
		let value = searchinput.value.trim()
		filesInFolder.forEach(obj => {
			if (obj.name.search(value) != -1) {
				let new_elem = createNode('div', `
					<span data-name="${obj.name}">${obj.name}</span>
					<span data-name="${obj.name}">${obj.size} Mb</span>
					`, ['string'])
				new_elem.dataset.name = obj.name
				elements.insertAdjacentElement('beforeend', new_elem)
			}
		})
	}
}

const printData = event => {
	if (event.target.dataset.name) {

		event.preventDefault()
		let fileInfoCont = document.querySelector('.file-info-container')
		let et = event.target
		let fileData = filesInFolder.find(el => el.name === et.dataset.name)
		
		if (!fileData) {
			return
		}

		if (fileInfoCont.firstElementChild.classList.value === 'folder-img') {
			fileInfoCont.innerHTML = ''
		}

		if (fileInfoCont.firstElementChild) {
			let fileDataInfo = fileInfoCont.querySelector('.info')
			let downloadBtn = fileInfoCont.querySelector('.download-btn')

			fileDataInfo.innerHTML = `
			<h2>File Info</h2>
			<span>File name: ${fileData.name}</span>
			<span>File size: ${fileData.size}</span>
			<span>File type: ${fileData.type}</span>
			`
			downloadBtn.href = `way/${fileData.name}`
		} else {

		let fileImg = createNode('div', '', ['file-img'])
		let fileDataInfo = createNode('div', `
			<h2>File Info</h2>
			<span>File name: ${fileData.name}</span>
			<span>File size: ${fileData.size}</span>
			<span>File type: ${fileData.type}</span>
			`, ['info', 'mdl'])
		let downloadBtn = `<a href="way/${fileData.name}" class="download-btn sbtn">Download</a>`

		fileInfoCont.insertAdjacentElement('beforeend', fileImg)
		fileInfoCont.insertAdjacentElement('beforeend', fileDataInfo)
		fileInfoCont.insertAdjacentHTML('beforeend', downloadBtn)
		}
	}
}

burger.addEventListener('click', burgerMenuAnimation)
fileinput.addEventListener('change', filesToFileList)
searchinput.addEventListener('input', searchFile)
elements.addEventListener('click', printData)