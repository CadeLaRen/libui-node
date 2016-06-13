const libui = require('../index.js');
const {
	datePicker,
	dateTimePicker,
	timePicker,
	separator,
	label,
	window,
	entry,
	hBox,
	group,
	button,
	checkBox,
	spinbox,
	slider,
	progressBar,
	vBox,
	combobox,
	editableCombobox,
	radioButtons,
	tab,
	menu/* ,
	multilineEntry*/
} = require('./utils.js');

libui.Ui.init();

const lorem =
`Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit
`;

const onClosing = () => libui.stopLoop();

let win;
let spin;
let slide;
let progress;

const updateValue = value => {
	if (value === spin.value) {
		return;
	}
	spin.value = value;
	slide.value = value;
	progress.value = value;
};

menu([{
	label: 'File',
	submenu: [
		{
			label: 'Open',
			click: () => {
				const filename = libui.UiDialogs.openFile(win);
				if (filename) {
					libui.UiDialogs.msgBoxError(win, 'File selected', filename);
				} else {
					libui.UiDialogs.msgBoxError(win, 'No file selected', 'Don\'t be alarmed!');
				}
			}
		}, {
			label: 'Save',
			click: () => {
				const filename = libui.UiDialogs.saveFile(win);
				if (filename) {
					libui.UiDialogs.msgBoxError(win, 'File selected', filename);
				} else {
					libui.UiDialogs.msgBoxError(win, 'No file selected', 'Don\'t be alarmed!');
				}
			}
		}, {
			role: 'quit'
		}
	]
}, {
	label: 'Edit',
	submenu: [
		{
			label: 'Checkable Item',
			type: 'checkbox'
		}, {
			type: 'separator'
		}, {
			label: 'Disabled Item',
			click: () => {}
		}, {
			role: 'preferences'
		}
	]
}, {
	label: 'Help',
	submenu: [
		{
			label: 'Help',
			click: () => {}
		}, {
			role: 'about'
		}
	]
}]);

win = window({hasMenubar: true, title: 'Control Gallery', width: 640, height: 480, onClosing},
	hBox({padded: true},
		group({margined: true, title: 'Basic Controls'},
			button({text: 'Button'}),
			checkBox({text: 'Checkbox'}),
			entry({text: 'Entry'}),
			label({text: 'Label'}),
			separator({}),
			datePicker({}),
			dateTimePicker({}),
			timePicker({})
		),

		vBox({padded: true},
			group({margined: true, title: 'Numbers'},
				spin = spinbox({onChanged: () => updateValue(spin.value)}),
				slide = slider({onChanged: () => updateValue(slide.value)}),
				progress = progressBar({})
			),

			group({margined: true, title: 'Lists', stretchy: true},
				combobox({},
					'Combobox Item 1',
					'Combobox Item 2',
					'Combobox Item 3'
				),
				editableCombobox({},
					'Editable Item 1',
					'Editable Item 2',
					'Editable Item 3'
				),
				radioButtons({},
					'Radio Button 1',
					'Radio Button 2',
					'Radio Button 3'
				),
				tab({stretchy: true},
					entry({
						text: lorem.slice(5),
						tabTitle: 'Page 1',
						stretchy: true
					}),
					entry({
						text: lorem.slice(10),
						tabTitle: 'Page 2',
						stretchy: true
					}),
					entry({
						text: lorem.slice(20),
						tabTitle: 'Page 3',
						stretchy: true
					})
				)
			)
		)
	)
);

win.show();
libui.startLoop();
