import Realm from 'realm';
import moment from 'moment';

// Realm.clearTestState();
// Declare Book Schema
class UrlSchema extends Realm.Object { }
UrlSchema.schema = {
  name: 'Url',
  primaryKey: 'id',
  properties: {
    id: 'int',
    url: 'string',
  },
};

// Reminder schema
class ReminderSchema extends Realm.Object { }
ReminderSchema.schema = {
  name: 'Reminder',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    date: 'date',
    time: 'date',
  },
};

// Task schema
class TaskSchema extends Realm.Object { }
TaskSchema.schema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'int',
    task: 'string',
    isChecked: 'bool',
  },
};

// Password shema
class PasswordSchema extends Realm.Object { }
PasswordSchema.schema = {
  name: 'Password',
  primarykey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    username: 'string',
    password: 'string',
    requiredPIN: 'bool',
  },
};

// SecurityQns shema
class SecurityQnsSchema extends Realm.Object { }
SecurityQnsSchema.schema = {
  name: 'SecurityQns',
  primarykey: 'id',
  properties: {
    id: 'int',
    question: 'string',
    answer: 'string',
    hint: 'string',
    showHint: 'bool',
  },
};

class PinSchema extends Realm.Object { }
PinSchema.schema = {
  name: 'Pin',
  primaryKey: 'id',
  properties: {
    id: 'int',
    pin: 'string',
  }
}

// Create realm
let realm = new Realm({
  schema: [
    UrlSchema,
    ReminderSchema,
    TaskSchema,
    PasswordSchema,
    SecurityQnsSchema,
    PinSchema
  ],
  schemaVersion: 4,
});

// Return all books
let getPath = () => {
  console.log('Realm is located at: ' + realm.path);
  //return realm.path.toString;
};
// Functions
// Return all books
let getAllUrls = () => {
  return realm.objects('Url');
};

// Add a single book using parameters
let addUrl = _url => {
  realm.write(() => {
    let _id = 0;
    if (getAllUrls().length > 0) {
      _id = realm.objects('Url').max('id') + 1;
    }

    const url = realm.create('Url', {
      id: _id,
      url: _url,
    });
  });
};

let getUrlById = _id => {
  return realm.objects('Url').filtered(`id = ${_id}`);
};

let deleteUrlById = _id => {
  realm.write(() => {
    realm.delete(getUrlById(_id));
  });
};

// Get all reminders
let getAllReminders = () => {
  return realm.objects('Reminder');
};

// Get all reminders
let getTodayReminders = () => {
  return realm
    .objects('Reminder')
    .filter(`date = ${moment(Date.now()).format('DD/MM/yyyy')}`);
};

// Add a single reminder using parameters
let addReminder = (_title, _date, _time) => {
  realm.write(() => {
    let _id = 0;
    if (getAllReminders().length > 0) {
      _id = realm.objects('Reminder').max('id') + 1;
      console.log(realm.objects('Reminder').max('id') + 1);
    }

    const reminder = realm.create('Reminder', {
      id: _id,
      title: _title,
      date: _date,
      time: _time,
    });
  });
};

// Get reminder by id
let getReminderById = _id => {
  return realm.objects('Reminder').filtered(`id = ${_id}`);
};

let deleteReminderById = _id => {
  realm.write(() => {
    realm.delete(getReminderById(_id));
  });
};

let updateReminderById = (_id, _title, _date, _time) => {
  realm.write(() => {
    //let reminder = getReminderById(_id);
    let reminder = realm.objects('Reminder')[_id];
    if (_title != '') {
      reminder.title = _title;
    }
    reminder.date = _date;
    reminder.time = _time;
  });
};

let deleteAllReminders = () => {
  realm.write(() => {
    realm.delete(getAllReminders());
  });
};

let deleteAllTasks = () => {
  realm.write(() => {
    realm.delete(getAllTasks());
  });
};

let getAllTasks = () => {
  return realm.objects('Task');
};

let updateCheckedById = (_id, _isChecked) => {
  console.log('----id Arr----------');
  console.log(realm.objects('Task')[_id]);
  console.log('---------------');
  realm.write(() => {
    let task = realm.objects('Task')[_id];
    console.log(task);

    task.isChecked = _isChecked;
    // console.log(task.isChecked==false)

    console.log(
      'check state of taskId: ' + _id + '| updated to ' + task.isChecked + '!!',
    );
  });
};

// Add a single book using parameters
let addTask = _task => {
  realm.write(() => {
    let _id = 0;
    if (getAllTasks().length > 0) {
      _id = realm.objects('Task').max('id') + 1;
    }

    const task = realm.create('Task', {
      id: _id,
      task: _task,
      isChecked: false,
    });
  });
};

let setTasks = (_taskArr) => {
  deleteAllTasks();
  for (var i = 0; i < _taskArr.length; i++) {
    realm.write(() => {
      realm.write(() => {
        let _id = i;
        const task = realm.create('Task', {
          id: _id,
          task: _taskArr[i].task,
          isChecked: false,
        });
      });
    })
  }
}

let getTaskById = _id => {
  return realm.objects('Task').filtered(`id = ${_id}`);
};

let deleteTaskById = _id => {
  realm.write(() => {
    realm.delete(getTaskById(_id));
  });
  console.log('Deleted Task!!');
};

// Password
let getAllPasswords = () => {
  return realm.objects('Password');
};

let addPassword = (_title, _username, _password, _requiredPIN) => {
  realm.write(() => {
    let _id = 0;
    if (getAllPasswords().length > 0) {
      _id = realm.objects('Password').max('id') + 1;
    }

    const password = realm.create('Password', {
      id: _id,
      title: _title,
      username: _username,
      password: _password,
      requiredPIN: _requiredPIN,
    });
  });
};

let getPasswordById = _id => {
  return realm.objects('Password').filtered(`id = ${_id}`);
};

let deletePasswordById = _id => {
  realm.write(() => {
    realm.delete(getPasswordById(_id));
  });
};

// Security Qns

let getAllQuestions = () => {
  return realm.objects('SecurityQns');
};

let getQuestionById = _id => {
  return realm.objects('SecurityQns')[_id];
};

let updateQuestionById = (_question, _answer, _hint, _showHint, _id) => {
  realm.write(() => {
    let question = realm.objects('SecurityQns')[_id];
    question.question = _question;
    question.answer = _answer;
    question.hint = _hint;
    question.showHint = _showHint;
  });
};

let addQuestion = (_question, _answer, _hint, _showHint) => {
  realm.write(() => {
    let _id = 0;
    if (getAllQuestions().length > 0) {
      _id = realm.objects('SecurityQns').max('id') + 1;
    }

    const question = realm.create('SecurityQns', {
      id: _id,
      question: _question,
      answer: _answer,
      hint: _hint,
      showHint: _showHint
    });
  });
};

//=====================================
// Pin
//=====================================

let addPin = (_pin) => { // there will be only 1 pin object, so id is always 0
  if (!pinExists()) {
    realm.write(() => {

      const pin = realm.create('Pin', {
        id: 0,
        pin: _pin
      });
    });
  }
}

let editPin = (_pin) => {
  realm.write(() => {
    let p = getPin();
    p.pin = _pin;
  })


}

let pinExists = () => {
  if (realm.objects('Pin').length == 0) {
    return false;
  } else {
    return true;
  }
}

let getPin = () => {
  if (pinExists()) {
    return realm.objects('Pin')[0].pin
  }
}


// Exports
// Export the realm so other files can access it
export default realm;

// Export other functions so other files can access it
export {
  deleteAllTasks,
  getAllUrls,
  addUrl,
  getUrlById,
  deleteUrlById,
  getAllReminders,
  getTodayReminders,
  addReminder,
  getReminderById,
  deleteReminderById,
  updateReminderById,
  getAllTasks,
  addTask,
  getTaskById,
  updateCheckedById,
  deleteTaskById,
  setTasks,
  getPath,
  getAllPasswords,
  deletePasswordById,
  addPassword,
  getQuestionById,
  getAllQuestions,
  addQuestion,
  updateQuestionById,
  pinExists,
  getPin,
  addPin,
  editPin,
};
